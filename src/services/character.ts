import { writable } from "svelte/store";
import { createGroupe, getGroups, removeGroupe, type InputCharacter, createCharacters, getMyCharacters, deleteCharacter, updateCharacter } from "./query";
import type Character from "../entity/character";


function createCharacter() {
    let characters: Character[] = [];
    const { subscribe, set, update } = writable(characters);
    subscribe((value) => {
        characters = value;
    });

    return {
        subscribe,
        addCharacter: (character: InputCharacter) => {
            createCharacters(character).then((character) => {
                update((value) => {
                    value.push(character);
                    return value;
                });
            }).catch((error) => {
                console.log(error);
            });
        },
        updateCharacterList: () => {
            getMyCharacters().then((response) => {
                characters = response;
                set(characters);
            });
        },
        removeCharacter: (characterId: number) => {
            deleteCharacter(characterId).then(() => {
                update((value) => {
                    let index = value.findIndex((character) => character.id === characterId);
                    value.splice(index, 1);
                    return value;
                });
            }).catch((error) => { });
        },
        updateCharacter: (characterId: number, character: InputCharacter) => {
            updateCharacter(characterId, character).then((character) => {
                update((value) => {
                    let index = value.findIndex((character) => character.id === characterId);
                    value[index] = character;
                    return value;
                });
            }).catch((error) => { });
        }
    }
}

const characterStore = createCharacter();
export default characterStore;