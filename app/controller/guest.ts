import GuestClass, { IGuest } from '../classes/guest';
import { ERROR_CODES } from '../const/error_codes';

exports.getAllGuests = async function (req: any, res: any) {
  const guestInstance = new GuestClass(req, res);

  try {
    await guestInstance.getAll().then((guests: IGuest[]) => {
      guestInstance.success.setResult({ guests: guests });
      return guestInstance.success.returnApi();
    });
  } catch (error) {
    guestInstance.error.catchError(error);
    return guestInstance.error.returnApi();
  }
};

exports.getGuestByCode = async function (req: any, res: any) {
  const guestInstance = new GuestClass(req, res);
  const { guestCode } = req.params;
  console.log(guestCode);

  try {
    await guestInstance.getByCode(guestCode).then((guests: IGuest[]) => {
      guestInstance.success.setResult({ guests: guests });
      return guestInstance.success.returnApi();
    });
  } catch (error) {
    guestInstance.error.catchError(error);
    return guestInstance.error.returnApi();
  }
};

exports.updateGuest = async (req: any, res: any) => {
  const guestInstance = new GuestClass(req, res);
  const { id, code, confirmed } = req.body;

  if (!id) {
    guestInstance.error.setResult([ERROR_CODES.MISSING_PARAMS]);
    return guestInstance.error.returnApi(401);
  }

  try {
    await guestInstance.update(id, confirmed).then((queryInfo) => {
      if (queryInfo.affectedRows > 0) {
        guestInstance.getByCode(code).then((guests: IGuest[]) => {
          guestInstance.success.setResult({ guests: guests });
          return guestInstance.success.returnApi();
        });
      } else {
        guestInstance.error.setResult([ERROR_CODES.GENERAL_UNKNOWN]);
        return guestInstance.error.returnApi();
      }
    });
  } catch (error: unknown) {
    guestInstance.error.catchError(error);
    return guestInstance.error.returnApi();
  }
};
