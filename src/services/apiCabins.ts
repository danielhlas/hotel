import supabase from "./supabase";
import toast from "react-hot-toast";

//---------------------------------------
//READ(DOWNLOAD) data from table Cabins (Supabase)
//---------------------------------------
export async function getCabins() {

	//-----Code from Supabase doc-----
	let { data, error } = await supabase
	.from('cabins')
	.select('*') 
	.order("created_at", { ascending: true });
	//--------------------------------------

	if (error) {
		console.error(error);
		throw new Error("Cabins could not be loaded");
	}

	return data;
}



//---------------------------------------
//DELETE 1 case in table Cabins(Supabase)
//---------------------------------------

export type cabinType = {
	id: number;
	created_at: Date;
	name: string;
	maxCapacity: number;
	regularPrice: number;
	discount: number;
	description: string;
	image: string;
}

export async function deleteCabin(cabin: cabinType) {

	//-----Code from Supabase doc-----
	const { data, error } = await supabase
	.from('cabins')
	.delete()
	.eq('id', cabin.id)
	//--------------------------------------
	
	if (error) {
		console.error(error);
		throw new Error("Cabin could not be deleted");
	}

	//Delete image from supabase storage
	const { error: deleteError } = await supabase.storage
    .from("cabin-images")
    .remove([cabin.image.split("/").pop()!]); 
	//= url adress split by /, last part (name of img) is used for identifying img in storage

	if (deleteError) {
		toast.error("We couldnt delete the image from the database.");
	}
	
	return data;
}



//---------------------------------------
//Add 1 case to Supabase Cabins:
//---------------------------------------
export async function addCabin(newCabin: cabinType) {

	const usingOldImg = newCabin.image?.startsWith?.("https://tmmduhcwahllfauqhkuj.supabase.co"); 
	const imageUniqueName = `${Math.random()}-${newCabin.image}`.replaceAll("/", "")
	const imageCompletePath = usingOldImg ? newCabin.image : `https://tmmduhcwahllfauqhkuj.supabase.co/storage/v1/object/public/cabin-images/${imageUniqueName}` 
	
	const { data, error } = await supabase
	.from('cabins')
	.insert([{...newCabin, image: imageCompletePath}])
	.select() 

		
	if (error) {
		console.error(error);
		throw new Error("Cabin could not be added");
	}

	//---Code from Supabase doc (upload image)--
	if(!usingOldImg){
		const { error: imgError } = await supabase
		.storage
		.from('cabin-images')
		.upload(imageUniqueName, newCabin.image)
		//-----------

		if(imgError) {
			throw new Error("Obrázek nemohl být nahrán, pokoj nebyl přidán.");
		}
	}
	
	return data;
}



//---------------------------------------
//EDIT 1 case in table Cabins(Supabase):
//---------------------------------------
export async function editCabin(newCabin: cabinType, oldImgUrl: string, newImage?: File){

	//If uploaded new image, create unique name for this image:
	const imageUniqueName = !newImage ? "" : `${Math.random()}-${newImage?.name}`.replaceAll("/", "")
	
	const imageCompletePath = !newImage ? newCabin.image : `https://tmmduhcwahllfauqhkuj.supabase.co/storage/v1/object/public/cabin-images/${imageUniqueName}` 

	const { data, error } = await supabase
	.from('cabins')
	.update({ ...newCabin, image: imageCompletePath })
	.eq('id', newCabin.id)
	.select()

	if (error) {
		console.error(error);
		throw new Error("Cabin could not be editted");
	}

	if(newImage) {
		//---code from supabase doc (upload file):
		const { error: imgError } = await supabase.storage
		.from('cabin-images')
		.upload(imageUniqueName, newImage)

		if(imgError) {
			throw new Error("Obrázek nemohl být nahrán, pokoj nebyl upraven.");
		}
	

		//new img uploaded-> delete old img from supabase storage
		const { error: changeImgError } = await supabase.storage
		.from("cabin-images")
		.remove([oldImgUrl.split("/").pop()!]); 

		if (changeImgError) {
			toast.error("We couldnt delete the image from the database");
		}
	}

	return data;
}