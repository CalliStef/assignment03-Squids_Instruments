import React from "react";
import { Squid } from "../models";

interface SquidListProps {
  squidArr: Squid[];
  handleDelete: (id: number) => Promise<void>;
  handleEdit: (SquidData: any) => Promise<void>;
}

export function SquidList({
  squidArr,
  handleDelete,
  handleEdit,
}: SquidListProps) {
  return (
    <div className="flex flex-col w-60 items-center gap-8">
      {squidArr.map((squid) => {
        return (
          <div key={squid.id} className="flex flex-col w-40 items-center gap-2 p-4 border-2 border-white border-dashed">
            <h2 className="font-bold">{squid.name}</h2>
            <p>Age: {squid.age}</p>

            {squid.instruments?.map((instrument) => (
              <div key={instrument.id}>
                <p>{instrument.name}</p>
                <p>{instrument.type}</p>
                <p>{instrument.color}</p>
              </div>
            ))}

            <button className="bg-orange-400" onClick={() => handleEdit(squid)}>Update</button>
            <button className="bg-red-500" onClick={() => handleDelete(squid.id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}
