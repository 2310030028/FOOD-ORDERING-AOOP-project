import os
import re
import subprocess

def kill_ports():
    # Get the list of active connections
    command = "netstat -ano"
    result = subprocess.check_output(command, shell=True, text=True)

    # Parse the result to extract process IDs
    lines = result.splitlines()
    for line in lines:
        match = re.search(r"LISTENING\s+(\d+)", line)
        if match:
            pid = match.group(1)
            try:
                # Kill the process by its PID
                os.system(f"taskkill /PID {pid} /F")
                print(f"Killed process {pid} successfully.")
            except Exception as e:
                print(f"Failed to kill process {pid}: {e}")

kill_ports()