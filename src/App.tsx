const handleSend = async (content: string) => {
  try {
    // Add user message
    addMessage({
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    });

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: content }),
    });

    const data = await response.json();

    addMessage({
      id: (Date.now() + 1).toString(),
      content: data.message,
      sender: 'george',
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('Error:', error);
  }
};