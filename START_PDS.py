import subprocess
import os
import time
import sys

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
ASM_DIR = os.path.join(ROOT_DIR, "..", "ASM")
PROJECT_BACKEND = os.path.join(ROOT_DIR, "Project", "backend")
PROJECT_FRONTEND = os.path.join(ROOT_DIR, "Project", "frontend")

PYTHON_PATH = r"C:\Program Files\Python312"
NODE_PATH = r"C:\Program Files\nodejs"
os.environ["PATH"] = f"{PYTHON_PATH};{PYTHON_PATH}\\Scripts;{NODE_PATH};" + os.environ["PATH"]

def start_process(cwd, command, name):
    if not os.path.exists(cwd):
        print(f"[SKIPPING] {name}: Directory not found: {cwd}")
        return None
    print(f"[STARTING] {name} at {cwd}...")
    return subprocess.Popen(command, cwd=cwd, shell=True)

def main():
    print("=" * 60)
    print("      SILVER PROJECT - AUTOMATED LAUNCHER (V1.1)")
    print("=" * 60)

    backend = start_process(PROJECT_BACKEND, "python run.py", "Project Backend")
    
    frontend = start_process(PROJECT_FRONTEND, "npm run dev -- --port 5173", "Project Frontend")
    
    asm = None
    if os.path.exists(ASM_DIR):
        asm = start_process(ASM_DIR, "streamlit run app_dashboard.py --server.port 8503", "ASM Weather")

    print("\n[OK] System is starting...")
    time.sleep(5)
    
    print("\n--- Access URLs ---")
    print("Silver UI: http://localhost:5173")
    if asm: print("Weather App: http://localhost:8503")
    print("API Base: http://localhost:5000/api")
    print("Swagger UI: http://localhost:5000/apidocs (Test API Here)")
    print("\nPress Ctrl + C to stop all processes.")

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n[STOPPING] Shutting down system...")
        if backend: backend.terminate()
        if frontend: frontend.terminate()
        if asm: asm.terminate()
        print("[DONE] Clean shutdown complete.")

if __name__ == "__main__":
    main()
