curl -X POST http://localhost:4000/knowledge/chat \
-H "Content-Type: application/json" \
-d '{"prompt":"complete this path: {\"graph theory\": {\"concepts\":[\"diameter\"]}} no yapping. your output should continue the chain. You can use arrays or objects as you like."}'