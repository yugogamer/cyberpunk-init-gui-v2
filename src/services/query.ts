import type Character from "../entity/character";
import type Groupe from "../entity/groupes";
import config from "./config";

class Query {
    operationName: String;
    query: String;
    variables: Object;
    constructor(operationName: String, query: String, variables: Object) {
        this.operationName = operationName;
        this.query = query;
        this.variables = variables;
    }
}

async function fetchGraphql(query: Query) {
    const response = await fetch(`${config.api_url}graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(query)
    });

    const json = await response.json();
    return json;
}

interface GroupsCharactersResponse {
    data: {
        getGroupe: {
            id: number;
            name: string;
            characters: Character[]
        }
    }
}

export async function getCharacters(groupeId: number) {
    let query = new Query(
        "GetGroupe",
        "query GetGroupe($groupeId: Int!) {  getGroupe(groupeId: $groupeId) {    id    name    characters {      id      name      baseRef      modifier      active   assetUrl }  }}",
        {
            groupeId: Number(groupeId)
        }
    );
    let response = await fetchGraphql(query);
    return response as GroupsCharactersResponse;
}

export async function getMyCharacters(){
    let query = new Query(
        "MyCharacter",
        "query MyCharacter{myCharacter{id name assetUrl baseRef modifier }}",
        {}
    );
    let response = await fetchGraphql(query);
    return response.data.myCharacter as Character[];
}

export async function deleteCharacter(characterId: number){
    let query = new Query(
        "Mutation",
        "mutation Mutation($characterId: Int!) { deleteCharacter(characterId: $characterId) }",
        {
            characterId: characterId
        });
    let response = await fetchGraphql(query);
    return response.data.deleteCharacter as boolean;
}

export async function updateCharacter(characterId: number, character: InputCharacter){
    let query = new Query(
        "UpdateCharacter",
        "mutation UpdateCharacter($characterId: Int!, $inputCharacter: UpdateCharacter!) {   updateCharacter(characterId: $characterId, inputCharacter: $inputCharacter) { assetUrl baseRef createdAt id modifier name updatedAt userId}}",
        {
            characterId: characterId,
            inputCharacter: character
        }
    );

    let response = await fetchGraphql(query);
    return response.data.updateCharacter as Character;
}

export interface InputCharacter {
    name: string;
    modifier: number;
    baseRef: number;
}

export async function createCharacters(character: InputCharacter) {
    let query = new Query(
        "CreateCharacter",
        "mutation CreateCharacter($character: InputCharacter!) { createCharacter(character: $character) {      baseRef      id      modifier      name assetUrl} }",
        { character: character }
    );

    let response = await fetchGraphql(query);
    return response.data.createCharacter as Character;
}

export async function createGroupe(name: String) {
    let query = new Query(
        "Mutation",
        "mutation Mutation($groupe: InputGroupe!) {  createGroupe(groupe: $groupe) {    id    name  }}",
        { groupe: { name: name } }
    );

    let response = await fetchGraphql(query);
    return response.data.createGroupe as Groupe;
}

export async function removeGroupe(groupeId: number) {
    const query = {
        operationName: "Mutation",
        query: "mutation Mutation($groupeId: Int!) {  deleteGroupe(groupeId: $groupeId)}",
        variables: {
            groupeId: groupeId,
        },
    };

    const response = await fetch(`${config.api_url}graphql`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(query),
    });
}

interface GroupsResponse {
    data: {
        getGroupes: Groupe[],
    }
}

export async function getGroups() {
    let query = new Query(
        "GetGroupes",
        "query GetGroupes{getGroupes{id name}}",
        {}
    );

    let response = await fetchGraphql(query);
    return response as GroupsResponse;
}

export async function assignCharacterToGroupe(groupeId: number, characterId: number) {
    let query = new Query(
        "AssignCharacterToGroupe",
        "mutation AssignCharacterToGroupe($groupeId: Int!, $characterId: Int!) {  assignCharacterToGroupe(groupeId: $groupeId, characterId: $characterId)}",
        {
            groupeId: groupeId,
            characterId: characterId
        }
    );

    let response = await fetchGraphql(query);
    return response.data.assignCharacterToGroupe as boolean;
}

export async function changeStatusInGroupe(groupeId: number, characterId: number, status : boolean){
    let query = new Query(
        "ChangeStatusInGroupe",
        "mutation ChangeStatusInGroupe($groupeId: Int!, $characterId: Int!, $active: Boolean!) {  changeStatusInGroupe(groupeId: $groupeId, characterId: $characterId, active: $active)}",
        {
            groupeId: groupeId,
            characterId: characterId,
            active: status
        });
    
        let response = await fetchGraphql(query);
        return response.data.changeStatusInGroupe as boolean;
}

export async function inviteUser(groupeId: number, userName: string){
    let query = new Query(
        "InviteUser",
        "mutation InviteUser($groupeId: Int!, $userName: String!) {  inviteUser(groupeId: $groupeId, userName: $userName)}",
        {
            groupeId: groupeId,
            userName: userName
        });
    
        let response = await fetchGraphql(query);
        return response.data.inviteUser as boolean;
}

export async function acceptInvitation(groupeId: number){
    let query = new Query(
        "AcceptInvitation",
        "mutation AcceptInvitation($groupeId: Int!) {  acceptInvitation(groupeId: $groupeId)}",
        {
            groupeId: groupeId
        });
    
        let response = await fetchGraphql(query);
        return response.data.acceptInvitation as boolean;
}

export async function declineInvitation(groupeId: number){
    let query = new Query(
        "DeclineInvitation",
        "mutation DeclineInvitation($groupeId: Int!) {  declineInvitation(groupeId: $groupeId)}",
        {
            groupeId: groupeId
        });
    
        let response = await fetchGraphql(query);
        return response.data.declineInvitation as boolean;
}

export async function getInvitations(){
    let query = new Query(
        "GetInvitation",
        "query GetInvitation{getInvitation{id name}}",
        {}
    );

    let response = await fetchGraphql(query);
    return response.data.getInvitation as Groupe[];
}

export async function removeCharacterFromGroupe(groupeId: number, characterId: number){
    let query = new Query(
        "RemoveCharacterFromGroupe",
        "mutation RemoveCharacterFromGroupe($groupeId: Int!, $characterId: Int!) {  removeCharacterFromGroupe(groupeId: $groupeId, characterId: $characterId)}",
        {
            groupeId: groupeId,
            characterId: characterId
        });
    
        let response = await fetchGraphql(query);
        return response.data.removeCharacterFromGroupe as boolean;
}