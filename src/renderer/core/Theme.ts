type Theme = {
  text: {
    default: Text;
    headline: Text;
    subtitle: Text;
  };
  spacing: {
    regular: number;
    small: number;
    large: number;
  };
};

type Text = {
  family: string;
  size: number;
  weight: 400 | 500 | 700;
};

export default Theme;
