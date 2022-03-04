import { useParams } from "react-router";

function ExamResults() {
    const { id } = useParams();

    console.log(id);

    return ( 
        <div>
            Results
        </div>
     );
}

export default ExamResults;