import type Character from "../entity/character";
import type Groupe from "../entity/groupes";
import Config from "./config";

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
    const config = new Config();
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
        "query GetGroupe($groupeId: Int!) {  getGroupe(groupeId: $groupeId) {    id    name    characters {      id      name      baseRef      modifier      active    }  }}",
        {
            groupeId: Number(groupeId)
        }
    );
    let response = await fetchGraphql(query);
    return response as GroupsCharactersResponse;
}

export interface InputCharacter {
    groupeId: number;
    name: string;
    modifier: number;
    baseRef: number;
    active: boolean;
}

export async function createCharacters(character: InputCharacter) {
    character.active = Boolean(character.active);
    let query = new Query(
        "CreateCharacter",
        "mutation CreateCharacter($character: InputCharacter!) { createCharacter(character: $character) {      active      baseRef      id      modifier      name } }",
        { character: character }
    );

    let response = await fetchGraphql(query);
    return response;
}

export async function createGroupe(name: String) {
    let query = new Query(
        "Mutation",
        "mutation Mutation($groupe: InputGroupe!) {  createGroupe(groupe: $groupe) {    id    name  }}",
        { groupe: { name: name } }
    );

    let response = await fetchGraphql(query);
    return response;
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