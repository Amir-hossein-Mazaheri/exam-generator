import { Table } from "antd";
import { useMemo } from "react";

function SelectStudent() {
    const formData = useMemo(() => {
        return [
            {
                
            }
        ]
    }, [])

    return ( 
        <div className="mt-5">
            <Table />
        </div>
     );
}

export default SelectStudent;