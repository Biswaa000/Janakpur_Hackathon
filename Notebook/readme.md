# AI/ML Pipeline: Legal Chatbot for Gender-Based Violence Cases

## Overview

This folder contains a complete AI/ML pipeline for building a **domain-specific legal chatbot** focused on gender-based violence and harassment cases in Nepal. The system uses Retrieval-Augmented Generation (RAG) to provide context-aware legal guidance based on constitutional and legal documents.

---

## Architecture & Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                    AI/ML Pipeline Workflow                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  1. Load LLM from Hugging Face/Google                           │
│           ↓                                                       │
│  2. Load & Process PDF Documents                                │
│           ↓                                                       │
│  3. Generate Text Embeddings                                    │
│           ↓                                                       │
│  4. Build FAISS Vector Database                                 │
│           ↓                                                       │
│  5. Create Retriever for Similarity Search                      │
│           ↓                                                       │
│  6. Engineer Context-Aware Prompt                               │
│           ↓                                                       │
│  7. Execute RAG Pipeline with User Query                        │
│           ↓                                                       │
│  8. Generate Legal Guidance Response                            │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Notebook 1: HuggingFace LLM Inference

**File:** `01_huggingFace_inference.ipynb`

### Purpose
Initialize and test Large Language Models from Hugging Face for text generation capabilities.

### Key Components

#### 1. **Package Installation**
```python
!pip install -U langchain-huggingface
```
- Installs LangChain wrapper for Hugging Face models

#### 2. **Import Required Libraries**
```python
from langchain_huggingface import ChatHuggingFace, HuggingFaceEndpoint
from dotenv import load_dotenv
import os
```
- `ChatHuggingFace`: Wrapper for chat-based LLMs
- `HuggingFaceEndpoint`: Connection to Hugging Face API

#### 3. **API Token Configuration**
```python
from google.colab import userdata
HUGGINGFACEHUB_API_TOKEN = userdata.get('HUGGINGFACEHUB_API_TOKEN')
```
- Retrieves API token from Google Colab secrets
- Enables authentication with Hugging Face Hub

#### 4. **LLM Initialization & Testing**
```python
llm = HuggingFaceEndpoint(
    repo_id="mistralai/Mistral-7B-Instruct-v0.2",
    task="text-generation",
    huggingfacehub_api_token=HUGGINGFACEHUB_API_TOKEN
)
chat_model = ChatHuggingFace(llm=llm)
response = chat_model.invoke("What is photosynthesis?")
```

### Models Tested
- **Mistral-7B-Instruct-v0.2**: Primary model for text generation (7 billion parameters)
- **TinyLlama-1.1B-Chat-v1.0**: Lightweight alternative (1.1 billion parameters)

### Output
Returns generated text responses from the selected LLM model.

---

## Notebook 2: Vector Store & RAG Setup

**File:** `02_vector_store.ipynb`

### Purpose
Build embeddings and FAISS vector database for document retrieval-augmented generation.

### Key Stages

#### Stage 1: PDF Document Loading
```python
pdf_path = "/content/fine_tune_data.pdf"
loader = PyPDFLoader(pdf_path)
documents = loader.load()
```
- Loads PDF documents using `PyPDFLoader`
- Extracts text and metadata from PDF pages

#### Stage 2: Text Preprocessing & Chunking
```python
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)
docs = text_splitter.split_documents(documents)
```
- **Chunk Size**: 1000 characters per chunk
- **Overlap**: 200 characters between chunks (maintains context)
- Splits long documents into manageable pieces for embedding

#### Stage 3: Embedding Generation
```python
embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)
```
- **Model**: `sentence-transformers/all-MiniLM-L6-v2`
- Converts text chunks into 384-dimensional vectors
- Free and efficient embedding model

#### Stage 4: Vector Database Creation
```python
vector_db = FAISS.from_documents(docs, embeddings)
vector_db.save_local("faiss_index")
```
- Creates FAISS (Facebook AI Similarity Search) index
- Saves index locally for persistence
- Enables fast similarity search

#### Stage 5: Vector Database Operations
```python
# Load saved index
new_db = FAISS.load_local("faiss_index", embeddings, 
                          allow_dangerous_deserialization=True)

# Perform similarity search
query = "What is the document about?"
results = new_db.similarity_search(query, k=3)
```
- Loads previously saved vector store
- Performs similarity search with k=3 (top 3 results)

#### Stage 6: Multi-Document Merging
```python
# Load existing index
db = FAISS.load_local("faiss_index", embeddings, 
                      allow_dangerous_deserialization=True)

# Load and process second PDF
pdf_path_2 = "/content/constitution_nowater.pdf"
loader2 = PyPDFLoader(pdf_path_2)
docs2 = loader2.load()

# Split and add metadata
docs2_chunks = text_splitter.split_documents(docs2)
for d in docs2_chunks:
    d.metadata["source"] = pdf_path_2

# Merge into existing vector store
db.add_documents(docs2_chunks)
db.save_local("faiss_index")
```
- Loads existing FAISS index
- Processes additional PDF documents
- Adds metadata to track document source
- Merges new documents with existing vector store

### Documents Processed
1. **fine_tune_data.pdf** - Legal and procedural documentation
2. **constitution_nowater.pdf** - Constitutional references for Nepal

### Output
- **faiss_index/** directory containing:
  - `index.faiss` - Vector index file
  - `index.pkl` - Index metadata

---

## Notebook 3: Final RAG Pipeline

**File:** `03_final_model.ipynb`

### Purpose
Build complete retrieval-augmented generation chatbot for legal guidance on gender-based violence.

### Component 1: Model Setup
```python
# Initialize LLM
model = ChatGoogleGenerativeAI(model='gemini-2.5-flash')

# Initialize embeddings
embeddings = HuggingFaceEmbeddings(
    model_name='sentence-transformers/all-MiniLM-L6-v2'
)

# Load vector store
loaded_vector_store = FAISS.load_local('faiss_index', embeddings, 
                                        allow_dangerous_deserialization=True)
```

**Models Used:**
- **LLM**: Google Generative AI (Gemini 2.5-Flash)
- **Embeddings**: HuggingFace (all-MiniLM-L6-v2)
- **Vector Store**: FAISS (pre-built)

### Component 2: Retriever Configuration
```python
retriever = loaded_vector_store.as_retriever(
    search_type="similarity", 
    search_kwargs={"k": 4}
)
```
- **Search Type**: Similarity-based search
- **k=4**: Retrieve top 4 most relevant documents
- Seamlessly integrates with LLM

### Component 3: Prompt Engineering
```python
prompt = PromptTemplate(
    template="""
You are a helpful AI assistant acting strictly as a legal advocate 
for matters related only to Nepal.
Use ONLY the information provided in the context. 
Do not rely on outside knowledge.

Your tasks:
- Answer the question based solely on the context.
- Identify applicable actions, charges, penalties, or fines under Nepali law 
  **only if they are present in the context**.
- If the context does not contain enough information, respond briefly with: 
  "Insufficient information in the context."

Context:
{context}

Question:
{question}

Provide a clear, concise, and context-grounded answer.
""",
    input_variables=["context", "question"]
)
```

**Key Features:**
- Domain-specific to Nepal legal matters
- Enforces context-only responses
- Prevents hallucination
- Graceful handling of insufficient information

### Component 4: RAG Execution
```python
# User query
question = "My Husband demand for dowry"

# Retrieve relevant documents
retrieved_docs = retriever.invoke(question)

# Prepare context
context_text = "\n\n".join(doc.page_content for doc in retrieved_docs)

# Format final prompt
final_prompt = prompt.invoke({"context": context_text, "question": question})

# Generate response
answer = model.invoke(final_prompt)
print(answer.content)
```

### Workflow
1. **User Input**: Question about gender-based violence/dowry
2. **Retrieval**: Search vector store for top 4 relevant documents
3. **Context Preparation**: Combine retrieved documents into context
4. **Prompt Assembly**: Inject context and question into template
5. **LLM Response**: Generate legal guidance using Gemini AI
6. **Output**: Clear, context-grounded legal guidance

---

## Technical Stack

| Component | Technology | Details |
|-----------|-----------|---------|
| **LLM** | Google Generative AI | Gemini 2.5-Flash model |
| **Embeddings** | HuggingFace | sentence-transformers/all-MiniLM-L6-v2 |
| **Vector Store** | FAISS | Facebook AI Similarity Search |
| **Framework** | LangChain | LLM orchestration and RAG |
| **Environment** | Google Colab | Cloud-based Jupyter notebook |

---

## Installation & Setup

### Prerequisites
- Google Colab account (or local Jupyter environment)
- API keys for:
  - Hugging Face Hub
  - Google Generative AI

### Installation Steps

1. **Clone notebooks** to Google Colab
2. **Set API Keys** in Colab Secrets:
   - `HUGGINGFACEHUB_API_TOKEN`
   - `GOOGLE_API_KEY`
3. **Upload PDF documents** to Colab:
   - `fine_tune_data.pdf`
   - `constitution_nowater.pdf`
4. **Execute cells sequentially**

### Required Python Packages
```bash
pip install langchain_google_genai langchain langchain-community
pip install langchain chromadb
pip install langchain_huggingface faiss-cpu
pip install langchain-text-splitters
pip install pypdf
```

---

## Key Features & Capabilities

### ✅ Context-Aware Responses
- Provides answers based only on provided documents
- No external knowledge injection
- Reduces hallucination

### ✅ Multi-Document Support
- Process and merge multiple PDF documents
- Track document sources with metadata
- Scalable vector store

### ✅ Domain-Specific Guidance
- Focused on Nepal legal matters
- Gender-based violence expertise
- Identifies penalties and applicable laws

### ✅ Efficient Retrieval
- Fast similarity search using FAISS
- Configurable k-value for top results
- 384-dimensional embeddings

### ✅ User-Friendly Interface
- Simple prompt template
- Graceful error handling
- Clear, concise responses

---

## Use Cases

1. **Legal Guidance Chatbot**
   - Answer questions on gender-based violence laws
   - Identify applicable penalties and charges
   - Provide resources and next steps

2. **NGO Support Tool**
   - Assist NGOs in providing legal information
   - Train volunteers with consistent responses
   - Document-backed guidance

3. **Policy Research**
   - Extract legal information from constitutional documents
   - Analyze applicable laws for specific cases
   - Support advocacy efforts

4. **Educational Tool**
   - Teach about Nepali legal frameworks
   - Provide case-specific explanations
   - Support awareness campaigns

---

## File Structure

```
Notebook/
├── 01_huggingFace_inference.ipynb     # LLM initialization
├── 02_vector_store.ipynb              # Vector DB creation
├── 03_final_model.ipynb               # RAG pipeline
├── readme1.md                         # This file
└── data/
    └── faiss_index/                   # Vector database
        ├── index.faiss
        └── index.pkl
```

---

## Performance Notes

- **Inference Time**: ~2-5 seconds per query
- **Retrieval Accuracy**: Top 4 documents with similarity search
- **Vector Dimensions**: 384 (all-MiniLM-L6-v2)
- **Model Size**: Mistral-7B or Gemini-Flash (efficient)
- **Storage**: ~100MB-500MB depending on document count

---

## Future Enhancements

- [ ] Fine-tune embeddings on Nepali legal texts
- [ ] Add multi-language support (Nepali, English, Hindi)
- [ ] Implement feedback loop for response improvement
- [ ] Add user session management
- [ ] Deploy as REST API
- [ ] Create web-based UI
- [ ] Add analytics and reporting
- [ ] Implement caching for frequent queries

---

## Troubleshooting

### Vector Store Not Loading
```python
# Use allow_dangerous_deserialization=True
FAISS.load_local("faiss_index", embeddings, 
                 allow_dangerous_deserialization=True)
```

### Out of Memory with Large PDFs
- Reduce `chunk_size` in text splitter
- Process documents in batches
- Use lightweight embedding models

### API Token Issues
- Verify tokens in Colab Secrets
- Check token expiration
- Regenerate tokens if needed

### Low Retrieval Quality
- Increase `k` value (retrieve more documents)
- Adjust `chunk_size` for better context
- Fine-tune embeddings on domain-specific data

---

## References & Documentation

- [LangChain Documentation](https://python.langchain.com/)
- [FAISS GitHub](https://github.com/facebookresearch/faiss)
- [Hugging Face Models](https://huggingface.co/models)
- [Google Generative AI](https://ai.google.dev/)
- [Sentence Transformers](https://www.sbert.net/)

Reference and Data source :[NCDinesh](https://github.com/NCDinesh/LegalChatbot/tree/master/data)

---

## Contact & Support

For questions or issues regarding the AI/ML pipeline, please contact the team at:
- **GitHub**: [Janakpur_Hackathon](https://github.com/Biswaa000/Janakpur_Hackathon.git)

---


