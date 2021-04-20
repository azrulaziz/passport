import { Link, animateScroll as scroll } from "react-scroll";
import { Progress } from 'antd';
import 'antd/lib/progress/style/index.css';

const ProfileCompletion = ({completionPercentage}) => {
    return (
        <>
            <h1 className="text-xl text-gray-10 font-semibold">Profile Completion</h1>
            <Progress percent={completionPercentage} strokeColor="#2E81C9" trailColor="#ffffff" />
        </>
    )
}

export default ProfileCompletion