package com.example.myapplication

import android.content.ContentValues
import android.content.Context
import android.database.Cursor
import android.database.sqlite.SQLiteDatabase
import android.database.sqlite.SQLiteOpenHelper

class DBHelper(context: Context?) :
    SQLiteOpenHelper(context, database_name, null, 2) {
    private val db: SQLiteDatabase
    override fun onCreate(db: SQLiteDatabase) {
        val query =
            ("CREATE TABLE " + table_name + "(" + row_id + " INTEGER PRIMARY KEY AUTOINCREMENT,"
                    + row_title + " TEXT," + row_note + " TEXT, " + row_created + " TEXT)")
        db.execSQL(query)
    }

    override fun onUpgrade(db: SQLiteDatabase, i: Int, x: Int) {
        db.execSQL("DROP TABLE IF EXISTS $table_name")
    }

    //Get All SQLite Data
    fun allData(): Cursor {
        return db.rawQuery(
            "SELECT * FROM $table_name ORDER BY $row_id DESC ",
            null
        )
    }

    //GET 1 DATA By ID
    fun oneData(id: Long): Cursor {
        return db.rawQuery(
            "SELECT * FROM $table_name WHERE $row_id=$id",
            null
        )
    }

    //Insert Data
    fun insertData(values: ContentValues?) {
        db.insert(table_name, null, values)
    }

    //Update Data
    fun updateData(values: ContentValues?, id: Long) {
        db.update(table_name, values, "$row_id=$id", null)
    }

    //Delete Data
    fun deleteData(id: Long) {
        db.delete(table_name, "$row_id=$id", null)
    }

    companion object {
        const val database_name = "db_note"
        const val table_name = "tabel_notes"
        const val row_id = "_id"
        const val row_title = "Title"
        const val row_note = "Note"
        const val row_created = "Created"
    }

    init {
        db = writableDatabase
    }
}