const updateById = async (apiUpdate, id, field, value) => {
    try {
        const response = await fetch(`${apiUpdate}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ [field]: value }),
        });
        const data = await response.json();
        return data
    } catch (error) {
        console.log(error);
       
    }
    
};
export default updateById;