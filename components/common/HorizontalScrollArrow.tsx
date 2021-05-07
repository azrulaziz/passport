

export const Arrow = ({ text,  }) => {
    return (
      <div className="cursor-pointer">{text}</div>
    );
};

export const ArrowLeft = Arrow({ text: '<' });
export const ArrowRight = Arrow({ text: '>' });
