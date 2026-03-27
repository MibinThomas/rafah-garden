import os
from rembg import remove

def process(input_path, output_path):
    print(f"Processing {input_path}...")
    with open(input_path, 'rb') as i:
        with open(output_path, 'wb') as o:
            input_data = i.read()
            output_data = remove(input_data)
            o.write(output_data)
    print(f"Saved {output_path}")

process("public/images/crush_orig.png", "public/images/crush.png")
process("public/images/fresh_orig.png", "public/images/fresh.png")
process("public/images/jam_orig.png", "public/images/jam.png")
print("All images processed successfully.")
