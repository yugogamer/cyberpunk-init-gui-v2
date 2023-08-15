import { writable } from "svelte/store";
import type Groupe from "../entity/groupes";
import { createGroupe, getGroups, removeGroupe } from "./query";


function createGroupes(){
    let groupes: Groupe[] = [];
    const { subscribe, set, update } = writable(groupes);
    subscribe((value) => {
        groupes = value;
    });

    return{
        subscribe,
        addGroupe: (name: string) => {
            createGroupe(name).then((groupe) => {
                update((value) => {
                    value.push(groupe);
                    return value;
                });
            }).catch((error) => {
                console.log(error);
            });
        },
        updateGroupesList: () => {
            getGroups().then((response) => {
                groupes = response.data.getGroupes
                set(groupes);
            });
        },
        removeGroupe: (groupeId: number) => {
            removeGroupe(groupeId).then(() => {
                update((value) => {
                    let index = value.findIndex((groupe) => groupe.id === groupeId);
                    value.splice(index, 1);
                    return value;
                });
            }).catch((error) => {});
        }
    }
}

const groupesStore = createGroupes();
export default groupesStore;