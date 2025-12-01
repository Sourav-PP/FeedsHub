import { Model, Document } from "mongoose";
import { IBaseRepository } from "../../domain/repositoryInterfaces/base-repository.interface";

export abstract class BaseRepository<TDomain, TDocument extends Document> implements IBaseRepository<TDomain> {
    private _model: Model<TDocument>;
    private _toDomain: (doc: TDocument) => TDomain;
    private _toModel: (data: Partial<TDomain>) => Partial<TDocument>;
    protected _toDomainArray(docs: TDocument[]): TDomain[] {
        return docs.map(d => this._toDomain(d));
    }

    constructor(
        model: Model<TDocument>,
        toDomain: (doc: TDocument) => TDomain,
        toModel: (doc: Partial<TDomain>) => Partial<TDocument>,
    ) {
        this._model = model;
        this._toDomain = toDomain;
        this._toModel = toModel;
    }

    // ---------- COMMON METHODS  ---------- //
    async create(data: Partial<TDomain>): Promise<TDomain> {
        const doc = await this._model.create(this._toModel(data));
        return this._toDomain(doc);
    }

    async findById(id: string): Promise<TDomain | null> {
        const doc = await this._model.findById(id);
        return doc ? this._toDomain(doc) : null;
    }

    async updateById(id: string, update: Partial<TDomain>): Promise<TDomain | null> {
        const doc = await this._model.findByIdAndUpdate(id, this._toModel(update), { new: true });
        return doc ? this._toDomain(doc) : null;
    }

    async deleteById(id: string): Promise<boolean> {
        const res = await this._model.findByIdAndDelete(id);
        return res ? true : false;
    }
}
