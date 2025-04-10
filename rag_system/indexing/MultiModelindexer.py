
from io import BytesIO
import pypdfium2 as pdfium
import backoff
import asyncio
import json
import os
import base64
import uuid
import pandas as pd
from PIL import Image
from IPython.display import Image, display

from openai import OpenAIError
from openai import AsyncOpenAI, OpenAI
from langchain_openai import ChatOpenAI

from langchain.text_splitter import CharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.document_loaders import TextLoader
from langchain_community.vectorstores import FAISS
from langchain_core.documents import Document
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser, JsonOutputParser
