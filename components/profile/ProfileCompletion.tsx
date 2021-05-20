import { Progress } from 'antd';
import 'antd/lib/progress/style/index.css';

const ProfileCompletion = ({completionPercentage}) => {
    return (
        <div className="w-1/2 md:w-full">
            <h1 className="text-base md:text-xl font-semibold">Profile Completion</h1>
            <Progress 
                percent={completionPercentage} 
                // success={{percent: completionPercentage, strokeColor: '#52C41A'}} 
                format={e => `${e}%`} 
                strokeColor={completionPercentage >= 100 ? "#52C41A" : "#2E81C9"}
                trailColor="#ffffff" 
            />
        </div>
    )
}

export default ProfileCompletion