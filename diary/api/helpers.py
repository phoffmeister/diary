from PIL import Image


def rotate_image(file_path, rotation):
    image = Image.open(file_path)
    rot_image = image.rotate(rotation, expand=True)
    rot_image.save(file_path)
