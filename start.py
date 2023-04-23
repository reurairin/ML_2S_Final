#!usb/bin/env python3

import sys
import os
import argparse
import shutil
from subprocess import check_call
from pathlib import Path


def main():
    parser = argparse.ArgumentParser(description="Server startup script")
    parser.add_argument("--host",
                        type=str,
                        default="127.0.0.1")
    parser.add_argument("--port",
                        type=str,
                        default="3000")
    parser.add_argument("-p", "--purge",
                        action="store_true",
                        default=False)
    args = parser.parse_args()

    try:
        if args.purge:
            purge_gen_dir()

        check_call(["uvicorn", "app:app",
                    "--reload",
                    "--host", args.host,
                    "--port", args.port])
    except BaseException as e:
        print(e, file=sys.stderr)
        return 1


def purge_gen_dir():
    generated_path = Path(__file__).parent / "generated"
    for filename in os.listdir(generated_path):
        file_path = os.path.join(generated_path, filename)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
        except Exception as e:
            print(f"Failed to delete {file_path}. Reason: {e}",
                  file=sys.stderr)
            return 1


if __name__ == "__main__":
    sys.exit(main())
