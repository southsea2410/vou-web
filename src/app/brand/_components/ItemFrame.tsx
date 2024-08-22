import { Edit3, TrashIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { DialogState, Item } from "@/services/types";

type ItemFrameProps = {
  item: Item;
  setEditDialog: (state: DialogState<Item>) => void;
  setDeleteDialog: (state: DialogState<Item>) => void;
};

export default function ItemFrame({ item, setEditDialog, setDeleteDialog }: ItemFrameProps) {
  const handleOpenEdit = () => {
    setEditDialog({
      open: true,
      item,
    });
  };
  const handleOpenDelete = () => {
    setDeleteDialog({
      open: true,
      item,
    });
  };

  return (
    <HoverCard>
      <HoverCardTrigger className="flex aspect-square w-fit flex-col items-center justify-center rounded border border-gray-300 hover:border-2 hover:border-primary">
        <Image src={item.icon} alt={item.name} width={64} height={64} />
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex gap-4">
          <div>
            <h3 className="text-lg font-bold">{item.name}</h3>
            <p className="line-clamp-3 text-sm text-gray-500">{item.description}</p>
          </div>
          <div className="flex flex-col gap-2">
            <Button size="icon" onClick={handleOpenEdit}>
              <Edit3 />
            </Button>
            <Button size="icon" variant="destructive" onClick={handleOpenDelete}>
              <TrashIcon />
            </Button>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
