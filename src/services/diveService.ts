import { DiveDB } from "../db/dive";
import { Dive, DiveForm } from "../model/dive";


export class DiveService {
    diveDB: DiveDB;

    constructor(diveDB: DiveDB) {
        this.diveDB = diveDB;
    }

    async createDive(userId: number, diveForm: DiveForm): Promise<Dive> {
        try{
            const newDive = await this.diveDB.saveDive(userId, diveForm);
            return newDive;
        } catch(error){
            console.error("Error in createDive", error);
            throw error;
        }
    }

    async getDiveById(id: number): Promise<Dive | null> {
        try{
            const dive = await this.diveDB.getDiveById(id);
            return dive;
        } catch(error) {
            console.error("Error in getDiveById", error);
            throw error;
        }
    }

    async deleteDiveById(id: number): Promise<void> {
        try{
            const diveDeleted = await this.diveDB.deleteDiveById(id);
        } catch(error){
            console.error("Error in deleteDiveById", error);
            throw error;
        }
    }

    async updateDiveById(id: number, diveData: DiveForm): Promise<Dive | null> {
        try{
            const updatedDive = await this.diveDB.updateDiveById(id, diveData);
            return updatedDive;
        } catch(error){
            console.error("Error in updateDiveById", error);
            throw error;
        }
    }
}
