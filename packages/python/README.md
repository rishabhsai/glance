# glance-sdk

**Structured screen understanding for AI apps.** [glance.run](https://glance.run)

Replace expensive screenshot-to-vision-model pipelines with one function call. Glance reads the macOS accessibility tree and gives your AI structured data about every UI element — role, label, value, and **exact pixel coordinates**.

## Install

```bash
pip install glance-sdk
```

## Usage

```python
from glance_sdk import screen, capture, find, check_access

# LLM-ready text — drop directly into your prompt
context = screen()

# Full structured data
state = capture()
print(state["app"])           # "VS Code"
print(state["elementCount"])  # 342
print(state["captureTimeMs"]) # 28.5

# Find element by name → exact coordinates
btn = find("Submit")
print(btn["centerX"], btn["centerY"])  # 520, 340

# Check accessibility permission
has_access = check_access()
```

## Why

| | Screenshot | Glance |
|---|---|---|
| **Speed** | 2-5 seconds | ~0.8 seconds |
| **Tokens** | ~3,000 (image) | ~500 (text) |
| **Cost** | ~$0.03 / call | ~$0.001 / call |
| **Positions** | AI guesses | Exact from OS |

## Requirements

- macOS 14.2+
- Accessibility permission (System Settings -> Privacy & Security -> Accessibility)

## License

MIT
