const form = document.getElementById('updateForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    if (formData.has('id'))
    {
        const data = {
            id: formData.get('id'),
            title: formData.get('title'),
            content: formData.get('content'),
            creation_date: formData.get('creation_date')
        }
    
        console.log('Sending JSON: ' + JSON.stringify(data));
    
        try {
            const response = await fetch('http://' + window.location.hostname + ':5000/api/notes', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            if (response.ok) {
                window.location.replace(window.location.protocol + 'notes');
            } else {
                const errorData = await response.json();
                console.error('Error: ', errorData);
            }
        } catch (error) {
            console.error('Error: ', error);
        }
    }
    else
    {
        const data = {
            title: formData.get('title'),
            content: formData.get('content')
        }
    
        console.log('Sending JSON: ' + JSON.stringify(data));
    
        try {
            const response = await fetch('http://' + window.location.hostname + ':5000/api/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            if (response.ok) {
                window.location.replace(window.location.protocol + 'notes');
            } else {
                const errorData = await response.json();
                console.error('Error: ', errorData);
            }
        } catch (error) {
            console.error('Error: ', error);
        }
    }
});