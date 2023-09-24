from flask import Flask, request, jsonify
import pyautogui
import pyaudio
import tempfile
import speechmatics
from httpx import HTTPStatusError

app = Flask(__name__)

# Define your Speechmatics API credentials
API_USERNAME = "your_username"
AUTH_TOKEN = "Gxzl6ZIxUorFuyDFP6s1CbyH4886nHDx"
LANGUAGE = "en"  # Specify the language you want to recognize

# Initialize PyAudio
audio_format = pyaudio.paInt16  # 16-bit audio
sample_rate = 16000
chunk_size = 1024
audio_duration = 5  # Maximum recording duration in seconds

# Temporary file to store the recorded audio
temp_audio_file = tempfile.NamedTemporaryFile(delete=False, suffix=".wav")

# Initialize Speechmatics client
client = speechmatics.client.SpeechmaticsClient(
    API_USERNAME, AUTH_TOKEN, generate_temp_token=True
)

# Define routes and logic
@app.route('/speech-recognition', methods=['POST'])
def speech_recognition():
    try:
        audio_data = record_audio()

        if audio_data:
            recognized_text = recognize_with_speechmatics(audio_data)
            action = interpret_command(recognized_text)

            if action:
                # Perform the corresponding action using pyautogui
                execute_action(action)

            return jsonify({"recognized_text": recognized_text})

    except HTTPStatusError as e:
        return jsonify({"error": f"Speechmatics recognition failed: {e}"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def record_audio():
    try:
        audio_stream = pyaudio.PyAudio().open(
            format=audio_format,
            channels=1,
            rate=sample_rate,
            input=True,
            frames_per_buffer=chunk_size
        )

        print("Recording...")

        audio_frames = []

        for _ in range(0, int(sample_rate / chunk_size * audio_duration)):
            data = audio_stream.read(chunk_size)
            audio_frames.append(data)

        print("Finished recording.")

        audio_stream.stop_stream()
        audio_stream.close()

        # Save the recorded audio to a temporary WAV file
        with open(temp_audio_file.name, 'wb') as wf:
            wf.write(b''.join(audio_frames))

        return temp_audio_file.read()

    except Exception as e:
        print("Error recording audio:", str(e))
        return None

def recognize_with_speechmatics(audio_data):
    try:
        job = client.create_job(language=LANGUAGE)
        job.upload_audio(data=audio_data)

        job.wait_for_completion()
        recognized_text = job.get_transcript()

        return recognized_text

    except HTTPStatusError as e:
        raise HTTPStatusError(500, f"Speechmatics recognition failed: {e}")

def interpret_command(recognized_text):
    if "play the movie" in recognized_text.lower():
        return "play"
    elif "pause the movie" in recognized_text.lower():
        return "pause"
    elif "fast forward the movie" in recognized_text.lower():
        return "fast_forward"
    elif "rewind the movie" in recognized_text.lower():
        return "rewind"
    else:
        return None

def execute_action(action):
    # Implement actions using pyautogui or other appropriate libraries
    if action == "play":
        # Perform play action (e.g., press the play key)
        pyautogui.press('space')
    elif action == "pause":
        # Perform pause action (e.g., press the pause key)
        pyautogui.press('space')
    elif action == "fast_forward":
        # Perform fast forward action (e.g., press the fast forward key)
        pyautogui.press('ctrl', 'right')
    elif action == "rewind":
        # Perform rewind action (e.g., press the rewind key)
        pyautogui.press('ctrl', 'left')

if __name__ == "__main__":
    app.run(debug=True)
