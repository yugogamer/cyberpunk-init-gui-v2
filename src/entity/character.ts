
export default class Character {
    id: number;
    name: string;
    modifier: number;
    baseRef: number;
    active: boolean;

    constructor(id: number, name: string, modifier: number, baseRef: number, active: boolean) {
        this.id = id;
        this.name = name;
        this.modifier = modifier;
        this.baseRef = baseRef;
        this.active = active;
    }
}