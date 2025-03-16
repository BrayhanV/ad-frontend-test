export interface AtSelectProps {
  id: string;
  name: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}
