 const handleOnChangeStatus = (productId, field, value) => {
    const fetchUpdateStatus = async () => {
      try {
        const response = await fetch(`${API}/${productId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ [field]: value }),
        });
        const data = await response.json();
        console.log('Update response:', data);
        setEditRowId(null); 
        setEditColIsDiamond(false);
        setEditColStatus(false);

        // Update the local state with the new value
        setOrderDetails((prevDetails) =>
          prevDetails.map((product) =>
            product.id === productId ? { ...product, [field]: value } : product
          )
        );
      } catch (error) {
        console.error('Error updating status:', error);
      }
    };
    fetchUpdateStatus();
  };
export default handleOnChangeStatus