import { Link, animateScroll as scroll } from "react-scroll";
import { Progress } from 'antd';
import 'antd/lib/progress/style/index.css';

const ProfileCompletion = ({completionPercentage}) => {
    return (
        <>
            <h1 className="text-xl text-gray-10 font-semibold">Profile Completion</h1>
            <Progress percent={completionPercentage} 
                // success={{percent: completionPercentage, strokeColor: '#52C41A'}} 
                format={e => `${e}%`} 
                strokeColor={completionPercentage >= 100 ? "#52C41A" : "#2E81C9"}
                trailColor="#ffffff" 
            />
        </>
    )
}

export default ProfileCompletion