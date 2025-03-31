// src/app/components/sidebar/modals/DatabaseIcon.tsx

type Props = {
    name: string;
    iconUrl: string;
    onClick: () => void;
  };
  
  export default function DatabaseIcon({ name, iconUrl, onClick }: Props) {
    return (
      <div
        className="flex flex-col items-center cursor-pointer hover:scale-105 transition"
        onClick={onClick}
      >
        <img src={iconUrl} alt={name} className="w-12 h-12" />
        <span className="text-sm mt-1 text-gray-700">{name}</span>
      </div>
    );
  }
  