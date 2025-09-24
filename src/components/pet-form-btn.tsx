import React from 'react'
import { Button } from './ui/button'
import { useFormStatus } from 'react-dom';

type PetFormBtnProps = {
  actionType: "Add" | "Edit";
};

export default function PetFormBtn({ actionType }: PetFormBtnProps) {

    const { pending} = useFormStatus();
  return (
    <Button className="self-end mt-2" type="submit" disabled={pending}>
        {actionType === "Add" ? "Add a new Pet" : "Edit Pet"}
      </Button>
  )
}
    