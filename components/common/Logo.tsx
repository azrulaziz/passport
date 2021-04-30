import Image from 'next/image'

const Logo: React.FC = () => {

    return (
        <div className="w-14 border">
            <img 
                src="/501.svg" 
                alt="500 startups logo" 
                width={55}
                height={55}
            />
        </div>
    )
}

export default Logo