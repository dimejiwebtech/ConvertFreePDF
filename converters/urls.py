from django.urls import path
from . import views

urlpatterns = [
    path("doc_to_pdf/", views.doc_to_pdf, name="doc_to_pdf"),
    path("convert_doc_to_pdf/", views.convert_doc_to_pdf, name="convert_doc_to_pdf"),
    
    path("pdf-to-doc/", views.pdf_to_doc, name="pdf_to_doc"),
    path("convert_pdf_to_doc/", views.convert_pdf_to_doc, name="convert_pdf_to_doc"),

    path("pdf-to-jpg/", views.pdf_to_jpg, name="pdf_to_jpg"),
    path("convert_pdf_to_jpg/", views.convert_pdf_to_jpg, name="convert_pdf_to_jpg"),

    path("jpg-to-pdf/", views.jpg_to_pdf, name="jpg_to_pdf"),
    path("convert_jpg_to_pdf/", views.convert_jpg_to_pdf, name="convert_jpg_to_pdf"),

    path("pdf-to-png/", views.pdf_to_png, name="pdf_to_png"),
    path("convert_pdf_to_png/", views.convert_pdf_to_png, name="convert_pdf_to_png"),

    path("compress-pdf/", views.pdf_compressor, name="pdf_compressor"),
    path("compress_pdf/", views.compress_pdf, name="compress_pdf"),
    path("pdf-compressor/", views.pdf_compressor, name="pdf_compressor"),

    path("merge-pdf/", views.merge_pdf_tool, name="merge_pdf_tool"),
    path("merge_pdf/", views.merge_pdfs, name="merge_pdf"),
    
    path("download/<str:file_name>/", views.download_file, name="download_file"),
]
