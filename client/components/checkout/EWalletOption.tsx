import React from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { cn } from '../../lib/utils';

interface EWalletOptionProps {
  name: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onSelect: () => void;
}

const EWalletOption: React.FC<EWalletOptionProps> = ({ name, icon, isSelected, onSelect }) => {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-lg",
        isSelected ? "border-2 border-primary shadow-md" : "border border-gray-200"
      )}
      onClick={onSelect}
    >
      <CardContent className="flex flex-col items-center justify-center p-4">
        <div className="mb-2 text-4xl">
          {icon}
        </div>
        <p className="text-sm font-medium text-center">{name}</p>
      </CardContent>
    </Card>
  );
};

export default EWalletOption;
