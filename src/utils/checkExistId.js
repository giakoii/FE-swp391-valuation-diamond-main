const checkExistId = async (api, id) =>{
    try {
        const response = await fetch(
          `${api}/${id}`
        );
        const data = await response.json()
        console.log('Checked',data)
        console.log(response)
        console.log(data.committedId)
        console.log(data[0]?.orderId?.orderId !== id)
        if (data[0]?.orderId.orderId === id) {
          return true;
        }
        return false;
      } catch (error) {
        console.error("Error checking ID existence:", error);
        return false;
      }
}
export default checkExistId