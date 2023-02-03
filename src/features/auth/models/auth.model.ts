import { Column, DataType, Model, Table, CreatedAt, UpdatedAt, PrimaryKey, Unique, BeforeCreate, BeforeUpdate } from 'sequelize-typescript';
import { hash, compare } from 'bcryptjs';

const SALT_ROUND = 10;
@Table({ tableName: 'authorised_parents' })
export class AuthorisedParent extends Model {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false
  })
  id!: number;

  @Unique
  @Column({ type: DataType.STRING, allowNull: false })
  email_address!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  child_name!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password!: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(instance: AuthorisedParent) {
    if (instance.changed('password')) {
      instance.password = await hash(instance.password, SALT_ROUND);
    }
  }

  async comparePassword(password: string) {
    return compare(password, this.password);
  }

  toJSON() {
    const values = { ...this.get() };
    delete values.password;
    return values;
  }
}
