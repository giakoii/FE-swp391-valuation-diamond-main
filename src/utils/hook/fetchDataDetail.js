import { useEffect, useState } from "react";

function useFetchDataDetail(dataApi, id) {
    const [dataDetail, setDataDetail] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(undefined);
    useEffect(() => {
       
        const fetchData = async () => {
            try {
                const response = await fetch(`${dataApi}/${id}`);
                const data = await response.json();
                setDataDetail(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        return () => {
            setLoading(false);
        };
    }, [dataApi, id]);

    return { dataDetail, loading, error };
}

export default useFetchDataDetail;
