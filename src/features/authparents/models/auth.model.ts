import { Column, DataType, Model, Table, CreatedAt, UpdatedAt, PrimaryKey, Unique } from 'sequelize-typescript';

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
}
