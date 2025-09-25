import React from 'react'
import { Button } from './ui/button'

type PetFormBtnProps = {
  actionType: "Add" | "Edit";
};

export default function PetFormBtn({ actionType }: PetFormBtnProps) {

  return (
    <Button className="self-end mt-2" type="submit">
        {actionType === "Add" ? "Add a new Pet" : "Edit Pet"}
      </Button>
  )
}
    