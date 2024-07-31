import React, { useState } from "react";
import ic_bag from "../../assets/icon_gery/bag.svg";
import ic_car from "../../assets/icon_gery/car.svg";
import ic_card from "../../assets/icon_gery/card.svg";
import ic_crefit_card from "../../assets/icon_gery/credit_card.svg";
import ic_list from "../../assets/icon_gery/list.svg";
import ic_people_setting from "../../assets/icon_gery/people_setting.svg";
import ic_people from "../../assets/icon_gery/people.svg";
import ic_setting from "../../assets/icon_gery/setting.svg";
import ic_unit from "../../assets/icon_gery/unit.svg";
import ProductManagementModalComponent from './modal/productManagementModal';
import UnitModalComponent from './modal/unitManagementModal';
import PositionModalComponent from './modal/positionManagementModal';
import UserManagementModalComponent from './modal/userManagementModal';
import BranchManagementModalComponent from './modal/branchManagementModal';
import PriceManagementModalComponent from './modal/priceManagementModal';
import WaterLineManagementModalComponent from './modal/waterLineManagementModal';
import UserWaterLineManagementModalComponent from './modal/userWaterLineManagementModal';
import VillageManagementModalComponent from './modal/villageManagementModal';
import ProvinceManagementModalComponent from './modal/provinceManagementModal';
import DistrictManagementModalComponent from './modal/districtManagementModal';
import CustomerManagementModalComponent from './modal/customerManagementModal';
import '../../App.css';
function ManageScreen() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);

    const openModal = (type) => {
        setModalType(type);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const CardItem = ({ iconSrc, text, onClick }) => {
        return (
            <div class=" text-subTextColor border border-subTextColor border-opacity-50 rounded-lg flex py-3 pl-6 mt-2 mr-2 " onClick={onClick}>
                <img src={iconSrc} alt="" className=" " />
                <p className="pl-4 text-lg font-semibold ">{text}</p>
            </div>
        );
    }
    return (
        <div className=" p-10  ">
            {modalType === 'product' && isModalOpen === true && (
                <ProductManagementModalComponent isOpen={isModalOpen} onClose={closeModal} />
            )}
            {modalType === 'unit' && isModalOpen === true && (
                <UnitModalComponent isOpen={isModalOpen} onClose={closeModal}>
                </UnitModalComponent>
            )}
            {modalType === 'positition' && isModalOpen === true && (
                <PositionModalComponent isOpen={isModalOpen} onClose={closeModal} />
            )}
            {modalType === 'user' && isModalOpen === true && (
                <UserManagementModalComponent isOpen={isModalOpen} onClose={closeModal} />
            )}
            {modalType === 'branch' && isModalOpen === true && (
                <BranchManagementModalComponent isOpen={isModalOpen} onClose={closeModal} />
            )}
            {modalType === 'price' && isModalOpen === true && (
                <PriceManagementModalComponent isOpen={isModalOpen} onClose={closeModal} />
            )}
            {modalType === 'water_line' && isModalOpen === true && (
                <WaterLineManagementModalComponent isOpen={isModalOpen} onClose={closeModal} />
            )}
            {modalType === 'user_water_line' && isModalOpen === true && (
                <UserWaterLineManagementModalComponent isOpen={isModalOpen} onClose={closeModal} />
            )}
            {modalType === 'village' && isModalOpen === true && (
                <VillageManagementModalComponent isOpen={isModalOpen} onClose={closeModal} />
            )}
            {modalType === 'province' && isModalOpen === true && (
                <ProvinceManagementModalComponent isOpen={isModalOpen} onClose={closeModal} />
            )}
            {modalType === 'district' && isModalOpen === true && (
                <DistrictManagementModalComponent isOpen={isModalOpen} onClose={closeModal} />
            )}
            {modalType === 'customer' && isModalOpen === true && (
                <CustomerManagementModalComponent isOpen={isModalOpen} onClose={closeModal} />
            )}
            <p className="text-2xl font-bold">ຈັດການຂໍ້ມູນພື້ນຖານ</p>
            <div className="grid grid-cols-3 gap-2 mt-10">
                <CardItem iconSrc={ic_bag} text="ຂໍ້ມູນສິນຄ້າ" onClick={() => openModal('product')} />
                <CardItem iconSrc={ic_unit} text="ຂໍ້ມູນຫົວໜ່ວຍ" onClick={() => openModal('unit')} />
                <CardItem iconSrc={ic_card} text="ຂໍ້ມູນຕຳແໜ່ງ" onClick={() => openModal('positition')} />
                <CardItem iconSrc={ic_people} text="ຂໍ້ມູນພະນັກງານ" onClick={() => openModal('user')} />
                <CardItem iconSrc={ic_people_setting} text="ຂໍ້ມູນສາຂາ ແລະ ລູກຄ້າປະຈຳ" onClick={() => openModal('branch')} />
                <CardItem iconSrc={ic_list} text="ຂໍ້ມູນລາຄາ" onClick={() => openModal('price')} />
                <CardItem iconSrc={ic_car} text="ຂໍ້ມູນລູກຄ້າ"onClick={() => openModal('customer')} />
                <CardItem iconSrc={ic_setting} text="ຂໍ້ມູນສາຍນ້ຳ" onClick={() => openModal('water_line')} />
                <CardItem iconSrc={ic_setting} text="ຂໍ້ມູນທີມສົ່ງນ້ຳ" onClick={() => openModal('user_water_line')} />
                <CardItem iconSrc={ic_setting} text="ຂໍ້ມູນບ້ານ" onClick={() => openModal('village')} />
                <CardItem iconSrc={ic_setting} text="ຂໍ້ມູນແຂວງ" onClick={() => openModal('province')} />
                <CardItem iconSrc={ic_setting} text="ຂໍ້ມູນເມືອງ" onClick={() => openModal('district')} />
                <CardItem iconSrc={ic_setting} text="ເງື່ອນໄຂການສະສົມຄະແນນ" onClick={() => { }} />
                <CardItem iconSrc={ic_setting} text="ຈັດການຂໍ້ມູນເງິນເດືອນ" onClick={() => { }} />
                <CardItem iconSrc={ic_setting} text="ປະເພດການເຄື່ອນໄຫວຕຸກ" onClick={() => { }} />
            </div>

        </div>
    );
}

export default ManageScreen;
