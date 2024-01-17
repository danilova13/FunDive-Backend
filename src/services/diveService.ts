import { DiveDB } from "../db/dive";
import { Dive, DiveForm } from "../model/dive";


export class DiveService {
    diveDB: DiveDB;

    constructor(diveDB: DiveDB) {
        this.diveDB = diveDB;
    }

    async createDive(userId: number, diveForm: DiveForm): Promise<Dive> {
        const newDive = await this.diveDB.saveDive(userId, diveForm);
        return newDive;
    }

    async getDiveById(id: number): Promise<Dive | null > {
        const dive = await this.diveDB.getDiveById(id);
        return dive;
    }

    async deleteDiveById(id: number): Promise<number> {
        const diveDeleted = await this.diveDB.deleteDiveById(id);
        return id;
    }

    async updateDiveById(id: number, diveData: DiveForm): Promise<Dive | null> {
        const updatedDive = await this.diveDB.updateDiveById(id, diveData);
        return updatedDive;
    }

    async getDivesByUserId(userId: number,  limit: number, offset: number): Promise<Dive[] | null> {
        const dives = await this.diveDB.getDivesByUserId(userId, limit, offset);
        return dives;
    }
}
