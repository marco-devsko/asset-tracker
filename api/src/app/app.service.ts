import { Injectable } from '@nestjs/common';

export interface ProdUsers {
  id: number;
  name: string;
  surname: string;
  email: string;
  born: string;
}

@Injectable()
export class AppService {
  private prodUsers = Array<ProdUsers>();
  private id = 0;
  async getData(page: number, size: number) {
    const users = Array.from({ length: 1500 }, (_, index) => ({
      id: index + 1,
      name: `User${index + 1}`,
      email: `user${index + 1}@example.com`,
    }));
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const startIndex = page * size;
    const endIndex = (Number(page) + 1) * size - 1;

    return {
      items: users.slice(startIndex, endIndex),
      totalItems: users.length,
    };
  }

  async getCalculation(a: number, b: number) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return Number(a) + Number(b);
  }

  async addNewProdUser(
    name: string,
    surname: string,
    email: string,
    born: string
  ): Promise<boolean> {
    const prodUserLengthBefore = this.prodUsers.length;
    console.log({ id: this.id, name, surname, email, born });
    this.prodUsers.push({ id: this.id, name, surname, email, born });
    // console.log(this.prodUsers)
    this.id++;
    if (prodUserLengthBefore < this.prodUsers.length) {
      return true;
    }

    return false;
  }

  async getAllProdUsers(): Promise<ProdUsers[]> {
    return this.prodUsers;
  }
}
