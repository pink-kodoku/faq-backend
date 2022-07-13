import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateCategoryDto} from './dto/create-category.dto';
import {UpdateCategoryDto} from './dto/update-category.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Category} from "./entities/category.entity";
import {Repository} from "typeorm";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>
    ) {
    }

    async create(createCategoryDto: CreateCategoryDto) {
        return await this.categoriesRepository.save(createCategoryDto);
    }

    async findAll() {
        return await this.categoriesRepository.find();
    }

    async findOne(id: number) {
        const category = await this.categoriesRepository.findOneBy({id});
        if (category) {
            return category;
        }
        throw new HttpException("Category not found", HttpStatus.NOT_FOUND);
    }

    async update(id: number, updateCategoryDto: UpdateCategoryDto) {
        await this.categoriesRepository.update(id, updateCategoryDto);
        const updatedCategory = await this.categoriesRepository.findOneBy({id});
        if (updatedCategory) {
            return updatedCategory;
        }
        throw new HttpException("Category not found", HttpStatus.NOT_FOUND);
    }

    async remove(id: number) {
        const deleteResponse = await this.categoriesRepository.delete(id);
        if (!deleteResponse.affected) {
            throw new HttpException("Category not found", HttpStatus.NOT_FOUND);
        }
    }
}
