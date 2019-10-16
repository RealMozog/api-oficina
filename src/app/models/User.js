import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        username: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        phone: Sequelize.STRING,
        cpf: Sequelize.STRING,
        birthdate: Sequelize.STRING,
        sex: Sequelize.STRING,
        address: Sequelize.STRING,
        zip_code: Sequelize.STRING,
        city: Sequelize.STRING,
        ies_city: Sequelize.STRING,
        ies: Sequelize.STRING,
        ies_type: Sequelize.STRING,
        ies_course: Sequelize.STRING,
        ies_registration: Sequelize.STRING,
        ies_graduation: Sequelize.STRING,
      },
      { sequelize }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
