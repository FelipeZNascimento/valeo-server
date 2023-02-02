import ErrorClass from './error';
import QueryMaker from './queryMaker';
import SuccessClass from './success';

export interface IGuest {
  id: number;
  code: string;
  name: string;
  confirmed: boolean;
  timestamp: string;
}

class PlayerClass extends QueryMaker {
  error: ErrorClass;
  success: SuccessClass;

  constructor(req?: any, res?: any) {
    super();

    this.error = new ErrorClass({ errors: [] }, req, res);
    this.success = new SuccessClass([], req, res);
  }

  async getAll() {
    return super.runQuery(
      `SELECT guests.id, guests.code, guests.name, guests.confirmed, guests.timestamp
        FROM guests
        ORDER BY guests.code ASC`
    );
  }

  async getByCode(code: string) {
    return super.runQuery(
      `SELECT guests.id, guests.code, guests.name, guests.confirmed, guests.timestamp
        FROM guests
        WHERE guests.code = ?
        ORDER BY guests.code ASC`,
      [code]
    );
  }

  async update(id: number, confirmed: boolean) {
    if (!id) {
      return;
    }

    return super.runQuery(
      `UPDATE guests
        SET confirmed = ?,
        timestamp = NOW()
        WHERE id = ?`,
      [confirmed, id]
    );
  }
}

export default PlayerClass;
