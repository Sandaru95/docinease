import os, io
from google.cloud import vision
from google.cloud.vision import types
import pandas as pd

# Create a PDF
from weasyprint import HTML, CSS
from weasyprint.fonts import FontConfiguration

import os
os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="/home/sandaru/path/python_path/p2/vision.json"

def generate_pdf_with_given_img(path_to_img, img_name):
    def implicit():
        from google.cloud import storage

        # If you don't specify credentials when constructing the client, the
        # client library will look for credentials in the environment.
        storage_client = storage.Client()

        # Make an authenticated API request
        buckets = list(storage_client.list_buckets())
        print(buckets)

    # implicit()
    # Image Annotator Client
    client = vision.ImageAnnotatorClient()

    def detect_handwritten_text(path):
        with io.open(path, "rb") as image_file:
            content = image_file.read()
            
        image = vision.types.Image(content=content)

        response = client.document_text_detection(image=image)

        texts = response.text_annotations

        df = pd.DataFrame(columns=["locale", "description"])

        for text in texts:
            df = df.append(
                {"locale": text.locale, "description": text.description},
                ignore_index=True,
            )

        return df

    # Getting image url as a user input
    returned_df = detect_handwritten_text(path_to_img)
    all_text = returned_df.description[0]

    # Creating a PDF Document
    # ========================================

    font_config = FontConfiguration()
    # HTML STARTS HERE
    html = HTML(string=f"""
    <h1 class='center-align'>{all_text[:15]}...</h1>
    <p>{all_text}</p>
    """)

    # CSS STARTS HERE
    css = CSS(string="""
            *{
                padding: 0;
                margin: 0;
                font-family: 'helvetica', sans-serif;
            }
            /* Globals */
            .center-align{
                text-align: center;
            }
        """, font_config=font_config)

    # Path is starting with only /media/pdf
    full_path = f"./media/pdfs/{img_name}.pdf"
    html.write_pdf(full_path, stylesheets=[css], font_config=font_config)

    # Path is starting with only /pdf
    returning_path = f"/pdfs/{img_name}.pdf"
    return {"returning_path": returning_path, "generated_name": all_text[:25]}



































































def return_text_from_given_img(path_to_img, img_name):
    def implicit():
        from google.cloud import storage

        # If you don't specify credentials when constructing the client, the
        # client library will look for credentials in the environment.
        storage_client = storage.Client()

        # Make an authenticated API request
        buckets = list(storage_client.list_buckets())
        print(buckets)

    # implicit()
    # Image Annotator Client
    client = vision.ImageAnnotatorClient()

    def detect_handwritten_text(path):
        with io.open(path, "rb") as image_file:
            content = image_file.read()
            
        image = vision.types.Image(content=content)

        response = client.document_text_detection(image=image)

        texts = response.text_annotations

        df = pd.DataFrame(columns=["locale", "description"])

        for text in texts:
            df = df.append(
                {"locale": text.locale, "description": text.description},
                ignore_index=True,
            )

        return df

    # Getting image url as a user input
    returned_df = detect_handwritten_text(path_to_img)
    all_text = returned_df.description[0]

    # Returning Text Detected
    # ========================================
    return all_text



























def return_pdf_from_given_text(path_to_img, img_name, text_passed):
    print("Text passed: ")
    print(text_passed)
    # Creating a PDF Document
    # ========================================

    font_config = FontConfiguration()
    # HTML STARTS HERE
    html = HTML(string=f"{text_passed}")

    # CSS STARTS HERE
    css = CSS(string="""
            *{
                padding: 0;
                margin: 0;
                font-family: 'helvetica', sans-serif;
            }
            /* Globals */
            .center-align{
                text-align: center;
            }
            /* PDF custom elements */
            s_underline{
                text-decoration: underline;
            }
            s_strike{
                text-decoration: line-through;
            }
            s_indent{
                display: inline-block;
                text-indent: 10px !important;
            }
            s_italic{
                font-style: italic;
            }
            s_align_left{
                display: block !important;
                width: 100% !important;
                text-align: left !important;
            }
            s_align_center{
                display: block !important;
                width: 100% !important;
                text-align: center !important;
            }
            s_align_right{
                display: block !important;
                width: 100% !important;
                text-align: right !important;
            }
            s_list_un::before{
                content: "⚫";
            }
    """, font_config=font_config)

    # Path is starting with only /media/pdf
    full_path = f"./media/pdfs/{img_name}.pdf"
    html.write_pdf(full_path, stylesheets=[css], font_config=font_config)

    # Path is starting with only /pdf
    returning_path = f"/pdfs/{img_name}.pdf"
    return {"returning_path": returning_path, "generated_name": text_passed.split(">")[1][:25]}