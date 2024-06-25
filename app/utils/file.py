from fastapi import UploadFile


async def is_pdf(file: UploadFile) -> bool:
    if not file.filename.lower().endswith(".pdf"):
        return False
    if file.content_type != "application/pdf":
        return False
    return True
