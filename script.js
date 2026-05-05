document.addEventListener("DOMContentLoaded", function() {
    showGreeting();
  });
  
  function showGreeting() {
    const chatArea = document.getElementById('chat-area');
    const optionsArea = document.getElementById('options-area');
    
    chatArea.innerHTML += `<p><b>Casey:</b> Hello! I am Casey, AMA LEGAL SOLUTIONS! How can I assist you today?</p>`;
    
    const options = ["Legal Consultation", "Documentation Assistance", "Contact / Location  Information", "General Inquiry"];
    optionsArea.innerHTML = '';
    
    options.forEach(option => {
      const btn = document.createElement('button');
      btn.innerText = option;
      btn.onclick = () => handleOption(option);
      optionsArea.appendChild(btn);
    });
  }

  function handleOption(option) {
    const chatArea = document.getElementById('chat-area');
    const optionsArea = document.getElementById('options-area');
    
    chatArea.innerHTML += `<p><b>User:</b> ${option}</p>`;
    
    if (option === "Contact / Location  Information") {
      chatArea.innerHTML += `<p><b>Casey:</b> You can contact us at:<br>📞 +91 87003 43611 <br>✉️ www.amalegals.com <br>📍419, tower A, Spaze IT Park, Sector 49, Gurgaon</p>`;
    } 
    else if (option === "Legal Consultation") {
      chatArea.innerHTML += `<p><b>Casey:</b> What area of law are you seeking help in?</p>`;
      
      const lawAreas = ["Banking & Finance", "Loan Settlement", "Family Law", "Criminal Law"];
      optionsArea.innerHTML = '';
      
      lawAreas.forEach(area => {
        const btn = document.createElement('button');
        btn.innerText = area;
        btn.onclick = () => askGuidance(area);
        optionsArea.appendChild(btn);
      });
    } 
    else {
      chatArea.innerHTML += `<p><b>Casey:</b> Please explain your query briefly. Our team will assist you shortly.</p>`;
      askUserInfo();
    }
  }
  
  function askGuidance(area) {
    const chatArea = document.getElementById('chat-area');
    const optionsArea = document.getElementById('options-area');
    
    chatArea.innerHTML += `<p><b>User:</b> ${area}</p>`;
    chatArea.innerHTML += `<p><b>Casey:</b> Would you like to seek guidance from our experts?</p>`;
    
    optionsArea.innerHTML = '';
    
    ["Yes", "No"].forEach(ans => {
      const btn = document.createElement('button');
      btn.innerText = ans;
      btn.onclick = () => {
        if (ans === "Yes") {
          askUserInfo();
        } else {
          chatArea.innerHTML += `<p><b>Casey:</b> Thank you for contacting AMA Legal Solutions!</p>`;
        }
      }
      optionsArea.appendChild(btn);
    });
  }
  
  function askUserInfo() {
    const chatArea = document.getElementById('chat-area');
    const optionsArea = document.getElementById('options-area');
    
    chatArea.innerHTML += `<p><b>Casey:</b> Please provide your Name, Phone Number, Email, and Brief Query.</p>`;
    
    optionsArea.innerHTML = `
      <input type="text" id="name" placeholder="Name" required><br><br>
      <input type="text" id="phone" placeholder="Phone Number" required><br><br>
      <input type="email" id="email" placeholder="Email" required><br><br>
      <textarea id="query" placeholder="Your Query" rows="3"></textarea><br><br>
      <button onclick="submitInfo()">Submit</button>
    `;
  }
  
  function submitInfo() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const query = document.getElementById('query').value;
  
    fetch('/submit_info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, phone, email, query})
    })
    
    .then(response => response.json())
    .then(data => {
      document.getElementById('chat-area').innerHTML += `<p><b>Casey:</b> Thank you! A lawyer will reach out to you within 24 hours.</p>`;
      document.getElementById('options-area').innerHTML = '';
    });
  }
  
